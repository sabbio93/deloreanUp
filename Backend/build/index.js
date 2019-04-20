module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest() { // eslint-disable-line no-unused-vars
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch(e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/ 	
/******/ 	function hotDisposeChunk(chunkId) { //eslint-disable-line no-unused-vars
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "c1f11b119ce75b34d829"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if(cb) {
/******/ 							if(callbacks.indexOf(cb) >= 0) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for(i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch(err) {
/******/ 							if(options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if(!options.ignoreErrored) {
/******/ 								if(!error)
/******/ 									error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err, // TODO remove in webpack 4
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function(moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__("./node_modules/webpack/hot/log.js");

	if(unacceptedModules.length > 0) {
		log("warning", "[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
		unacceptedModules.forEach(function(moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if(!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function(moduleId) {
			if(typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function(moduleId) {
			return typeof moduleId === "number";
		});
		if(numberIds)
			log("info", "[HMR] Consider using the NamedModulesPlugin for module names.");
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/***/ (function(module, exports) {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog = (logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function(level, msg) {
		if(shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function(level, msg) {
	if(shouldLog(level)) {
		if(level === "info") {
			console.log(msg);
		} else if(level === "warning") {
			console.warn(msg);
		} else if(level === "error") {
			console.error(msg);
		}
	}
};

var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function(level) {
	logLevel = level;
};


/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?1000":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if(true) {
	var hotPollInterval = +(__resourceQuery.substr(1)) || (10 * 60 * 1000);
	var log = __webpack_require__("./node_modules/webpack/hot/log.js");

	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if(module.hot.status() === "idle") {
			module.hot.check(true).then(function(updatedModules) {
				if(!updatedModules) {
					if(fromUpdate) log("info", "[HMR] Update applied.");
					return;
				}
				__webpack_require__("./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);
				checkForUpdate(true);
			}).catch(function(err) {
				var status = module.hot.status();
				if(["abort", "fail"].indexOf(status) >= 0) {
					log("warning", "[HMR] Cannot apply update.");
					log("warning", "[HMR] " + err.stack || err.message);
					log("warning", "[HMR] You need to restart the application!");
				} else {
					log("warning", "[HMR] Update failed: " + err.stack || err.message);
				}
			});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {
	throw new Error("[HMR] Hot Module Replacement is disabled.");
}

/* WEBPACK VAR INJECTION */}.call(exports, "?1000"))

/***/ }),

/***/ "./src/Plugins/DocNodesFinder/staticCode.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllNodes", function() { return getAllNodes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_DocNode__ = __webpack_require__("./src/model/DocNode.js");


const docNodes = [new __WEBPACK_IMPORTED_MODULE_0__model_DocNode__["a" /* default */]('1', '127.0.0.1', 5555), new __WEBPACK_IMPORTED_MODULE_0__model_DocNode__["a" /* default */]('2', '192.168.0.13', 5555)];

function getAllNodes() {
  return docNodes;
}



/***/ }),

/***/ "./src/app.js":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Starting point of our project
 *
 */
const createError = __webpack_require__("http-errors");
const express = __webpack_require__("express");
const cookieParser = __webpack_require__("cookie-parser");
const logger = __webpack_require__("morgan");
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * Routes section, load routes:
 *  - containers
 *  - volumes
 */
const docNodesRouter = __webpack_require__("./src/routes/api/docNodes.js");

app.use('/api/v' + process.env.npm_package_version + '/nodes', docNodesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  if (process.env.NODE_ENV === 'development') {
    console.log(err);
  }
  res.setHeader('Content-Type', 'application/json');
  res.status(err.status || 500);
  res.json({
    code: err.status || 500,
    message: process.env.NODE_ENV !== 'development' ? 'Internal server error' : err.message
  });
});

module.exports = app;

/***/ }),

/***/ "./src/bin/index.js":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

const app = __webpack_require__("./src/app.js");
const debug = __webpack_require__("debug")('helloworld:server');
const http = __webpack_require__("http");

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);

    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);

    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

/***/ }),

/***/ "./src/controllers/baseController.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return successResponse; });
/* unused harmony export errorResponse */
/** Base controllers module, containing methods usefull for all controllers
 * @module Controllers/baseController
 */

/**
 * Return a generic success response
 * @param {Object} res - the response object to use to send the error
 * @param {Object} response - a generic json object to return as response body
 */
const successResponse = (res, response) => {
  res.status(200).json(response);
};

/**
 * Return a generic error response
 * @param {Object} res - the response object to use to send the error
 * @param {string} code - the code of the error
 * @param {string} message - the message of the error
 * module:Controllers/baseController~errorResponse
 */
const errorResponse = (res, code, message) => {
  res.status(code).json({
    code,
    message
  });
};



/***/ }),

/***/ "./src/controllers/docNodesController.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllNodeList", function() { return getAllNodeList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Plugins_DocNodesFinder_staticCode__ = __webpack_require__("./src/Plugins/DocNodesFinder/staticCode.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_controllers_baseController__ = __webpack_require__("./src/controllers/baseController.js");



const getConfiguredPlugins = () => {
  return [__WEBPACK_IMPORTED_MODULE_0_Plugins_DocNodesFinder_staticCode__];
};

const getAllNodeList = (req, res, next) => {
  const nodes = [];
  getConfiguredPlugins().map(plugin => plugin.getAllNodes().map(node => nodes.push(node)));
  __WEBPACK_IMPORTED_MODULE_1_controllers_baseController__["a" /* successResponse */](res, { nodes });
};



/***/ }),

/***/ "./src/model/DocNode.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class DocNode {
  /**
   * Create a Doc Node reference
   * @param {string} id - unique identifier for the node
   * @param {string} ip - ip of the node
   * @param {int} port - port of the node
   */
  constructor(id, ip, port) {
    this.id = id;
    this.ip = ip;
    this.port = port;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (DocNode);

/***/ }),

/***/ "./src/routes/api/docNodes.js":
/***/ (function(module, exports, __webpack_require__) {

const express = __webpack_require__("express");
const docNodesController = __webpack_require__("./src/controllers/docNodesController.js");
const router = new express.Router();

/**
 * @route   GET api/<version>/nodes/list
 * @desc    Return a list of active nodes
 * @access  Private
 */
router.get('/list', docNodesController.getAllNodeList);

module.exports = router;

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./src/bin/index.js");
module.exports = __webpack_require__("./node_modules/webpack/hot/poll.js?1000");


/***/ }),

/***/ "cookie-parser":
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),

/***/ "debug":
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),

/***/ "express":
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "http":
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "http-errors":
/***/ (function(module, exports) {

module.exports = require("http-errors");

/***/ }),

/***/ "morgan":
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2svYm9vdHN0cmFwIGMxZjExYjExOWNlNzViMzRkODI5IiwiL1VzZXJzL2FsZXNzYW5kcm9zdGFmZm9sYW5pL1dvcmtzcGFjZS9MQVZPUk8vSW1vbGFJbmZvcm1hdGljYS9kZWxvcmVhbi9kZWxvcmVhblVwL0JhY2tlbmQvbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2xvZy1hcHBseS1yZXN1bHQuanMiLCIvVXNlcnMvYWxlc3NhbmRyb3N0YWZmb2xhbmkvV29ya3NwYWNlL0xBVk9STy9JbW9sYUluZm9ybWF0aWNhL2RlbG9yZWFuL2RlbG9yZWFuVXAvQmFja2VuZC9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvbG9nLmpzIiwiL1VzZXJzL2FsZXNzYW5kcm9zdGFmZm9sYW5pL1dvcmtzcGFjZS9MQVZPUk8vSW1vbGFJbmZvcm1hdGljYS9kZWxvcmVhbi9kZWxvcmVhblVwL0JhY2tlbmQvbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L3BvbGwuanM/MTAwMCIsIi9Vc2Vycy9hbGVzc2FuZHJvc3RhZmZvbGFuaS9Xb3Jrc3BhY2UvTEFWT1JPL0ltb2xhSW5mb3JtYXRpY2EvZGVsb3JlYW4vZGVsb3JlYW5VcC9CYWNrZW5kL3NyYy9QbHVnaW5zL0RvY05vZGVzRmluZGVyL3N0YXRpY0NvZGUuanMiLCIvVXNlcnMvYWxlc3NhbmRyb3N0YWZmb2xhbmkvV29ya3NwYWNlL0xBVk9STy9JbW9sYUluZm9ybWF0aWNhL2RlbG9yZWFuL2RlbG9yZWFuVXAvQmFja2VuZC9zcmMvYXBwLmpzIiwiL1VzZXJzL2FsZXNzYW5kcm9zdGFmZm9sYW5pL1dvcmtzcGFjZS9MQVZPUk8vSW1vbGFJbmZvcm1hdGljYS9kZWxvcmVhbi9kZWxvcmVhblVwL0JhY2tlbmQvc3JjL2Jpbi9pbmRleC5qcyIsIi9Vc2Vycy9hbGVzc2FuZHJvc3RhZmZvbGFuaS9Xb3Jrc3BhY2UvTEFWT1JPL0ltb2xhSW5mb3JtYXRpY2EvZGVsb3JlYW4vZGVsb3JlYW5VcC9CYWNrZW5kL3NyYy9jb250cm9sbGVycy9iYXNlQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9hbGVzc2FuZHJvc3RhZmZvbGFuaS9Xb3Jrc3BhY2UvTEFWT1JPL0ltb2xhSW5mb3JtYXRpY2EvZGVsb3JlYW4vZGVsb3JlYW5VcC9CYWNrZW5kL3NyYy9jb250cm9sbGVycy9kb2NOb2Rlc0NvbnRyb2xsZXIuanMiLCIvVXNlcnMvYWxlc3NhbmRyb3N0YWZmb2xhbmkvV29ya3NwYWNlL0xBVk9STy9JbW9sYUluZm9ybWF0aWNhL2RlbG9yZWFuL2RlbG9yZWFuVXAvQmFja2VuZC9zcmMvbW9kZWwvRG9jTm9kZS5qcyIsIi9Vc2Vycy9hbGVzc2FuZHJvc3RhZmZvbGFuaS9Xb3Jrc3BhY2UvTEFWT1JPL0ltb2xhSW5mb3JtYXRpY2EvZGVsb3JlYW4vZGVsb3JlYW5VcC9CYWNrZW5kL3NyYy9yb3V0ZXMvYXBpL2RvY05vZGVzLmpzIiwiZXh0ZXJuYWwgXCJjb29raWUtcGFyc2VyXCIiLCJleHRlcm5hbCBcImRlYnVnXCIiLCJleHRlcm5hbCBcImV4cHJlc3NcIiIsImV4dGVybmFsIFwiaHR0cFwiIiwiZXh0ZXJuYWwgXCJodHRwLWVycm9yc1wiIiwiZXh0ZXJuYWwgXCJtb3JnYW5cIiJdLCJuYW1lcyI6WyJkb2NOb2RlcyIsIkRvY05vZGUiLCJnZXRBbGxOb2RlcyIsImNyZWF0ZUVycm9yIiwicmVxdWlyZSIsImV4cHJlc3MiLCJjb29raWVQYXJzZXIiLCJsb2dnZXIiLCJhcHAiLCJ1c2UiLCJqc29uIiwidXJsZW5jb2RlZCIsImV4dGVuZGVkIiwiZG9jTm9kZXNSb3V0ZXIiLCJwcm9jZXNzIiwiZW52IiwibnBtX3BhY2thZ2VfdmVyc2lvbiIsInJlcSIsInJlcyIsIm5leHQiLCJlcnIiLCJOT0RFX0VOViIsImNvbnNvbGUiLCJsb2ciLCJzZXRIZWFkZXIiLCJzdGF0dXMiLCJjb2RlIiwibWVzc2FnZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJkZWJ1ZyIsImh0dHAiLCJwb3J0Iiwibm9ybWFsaXplUG9ydCIsIlBPUlQiLCJzZXQiLCJzZXJ2ZXIiLCJjcmVhdGVTZXJ2ZXIiLCJsaXN0ZW4iLCJvbiIsIm9uRXJyb3IiLCJvbkxpc3RlbmluZyIsInZhbCIsInBhcnNlSW50IiwiaXNOYU4iLCJlcnJvciIsInN5c2NhbGwiLCJiaW5kIiwiZXhpdCIsImFkZHIiLCJhZGRyZXNzIiwic3VjY2Vzc1Jlc3BvbnNlIiwicmVzcG9uc2UiLCJlcnJvclJlc3BvbnNlIiwiZ2V0Q29uZmlndXJlZFBsdWdpbnMiLCJzdGF0aWNDb2RlIiwiZ2V0QWxsTm9kZUxpc3QiLCJub2RlcyIsIm1hcCIsInBsdWdpbiIsIm5vZGUiLCJwdXNoIiwiYmFzZUNvbnRyb2xsZXIiLCJjb25zdHJ1Y3RvciIsImlkIiwiaXAiLCJkb2NOb2Rlc0NvbnRyb2xsZXIiLCJyb3V0ZXIiLCJSb3V0ZXIiLCJnZXQiXSwibWFwcGluZ3MiOiI7O0FBQUEsb0RBQTRDO0FBQzVDO0FBQ0E7QUFDQTs7QUFFQSwwQ0FBa0M7QUFDbEM7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw2Q0FBcUM7QUFDckM7QUFDQTs7OztBQUlBO0FBQ0Esc0RBQThDO0FBQzlDO0FBQ0E7QUFDQSxvQ0FBNEI7QUFDNUIscUNBQTZCO0FBQzdCLHlDQUFpQzs7QUFFakMsK0NBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhDQUFzQztBQUN0QztBQUNBO0FBQ0EscUNBQTZCO0FBQzdCLHFDQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQW9CLGdCQUFnQjtBQUNwQztBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBb0IsZ0JBQWdCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5QkFBaUIsOEJBQThCO0FBQy9DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQSw0REFBb0Q7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQW1CLDJCQUEyQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBa0IsY0FBYztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztB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QU1JLFVBQVVELG1CQUFPQSxDQUFDLFNBQVIsQ0FBaEI7QUFDQSxNQUFNOEQscUJBQXFCOUQsbUJBQU9BLENBQUMseUNBQVIsQ0FBM0I7QUFDQSxNQUFNK0QsU0FBUyxJQUFJOUQsUUFBUStELE1BQVosRUFBZjs7QUFFQTs7Ozs7QUFLQUQsT0FBT0UsR0FBUCxDQUFXLE9BQVgsRUFBb0JILG1CQUFtQlYsY0FBdkM7O0FBRUE1QixPQUFPQyxPQUFQLEdBQWlCc0MsTUFBakIsQzs7Ozs7Ozs7Ozs7Ozs7OztBQ1hBLDBDOzs7Ozs7O0FDQUEsa0M7Ozs7Ozs7QUNBQSxvQzs7Ozs7OztBQ0FBLGlDOzs7Ozs7O0FDQUEsd0M7Ozs7Ozs7QUNBQSxtQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0dmFyIGNodW5rID0gcmVxdWlyZShcIi4vXCIgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCIpO1xyXG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rLmlkLCBjaHVuay5tb2R1bGVzKTtcclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdCgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdHRyeSB7XHJcbiBcdFx0XHR2YXIgdXBkYXRlID0gcmVxdWlyZShcIi4vXCIgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIik7XHJcbiBcdFx0fSBjYXRjaChlKSB7XHJcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiBcdFx0fVxyXG4gXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUodXBkYXRlKTtcclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHsgLy9lc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcclxuIFx0fVxyXG5cbiBcdFxyXG4gXHRcclxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xyXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcImMxZjExYjExOWNlNzViMzRkODI5XCI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XHJcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xyXG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0aWYoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcclxuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XHJcbiBcdFx0XHRpZihtZS5ob3QuYWN0aXZlKSB7XHJcbiBcdFx0XHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcclxuIFx0XHRcdFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPCAwKVxyXG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xyXG4gXHRcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGlmKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPCAwKVxyXG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XHJcbiBcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXF1ZXN0ICsgXCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICsgbW9kdWxlSWQpO1xyXG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XHJcbiBcdFx0fTtcclxuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xyXG4gXHRcdFx0cmV0dXJuIHtcclxuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxyXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xyXG4gXHRcdFx0XHR9LFxyXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9O1xyXG4gXHRcdH07XHJcbiBcdFx0Zm9yKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJiBuYW1lICE9PSBcImVcIikge1xyXG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xyXG4gXHRcdFx0aWYoaG90U3RhdHVzID09PSBcInJlYWR5XCIpXHJcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XHJcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XHJcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcclxuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XHJcbiBcdFx0XHRcdHRocm93IGVycjtcclxuIFx0XHRcdH0pO1xyXG4gXHRcclxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcclxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xyXG4gXHRcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XHJcbiBcdFx0XHRcdFx0aWYoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xyXG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdGlmKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XHJcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fTtcclxuIFx0XHRyZXR1cm4gZm47XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0dmFyIGhvdCA9IHtcclxuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcclxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXHJcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxyXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXHJcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcclxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxyXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXHJcbiBcdFxyXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxyXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxyXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XHJcbiBcdFx0XHRcdGlmKHR5cGVvZiBkZXAgPT09IFwidW5kZWZpbmVkXCIpXHJcbiBcdFx0XHRcdFx0aG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xyXG4gXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIilcclxuIFx0XHRcdFx0XHRob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcclxuIFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxyXG4gXHRcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXHJcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xyXG4gXHRcdFx0XHRlbHNlXHJcbiBcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcclxuIFx0XHRcdFx0aWYodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIilcclxuIFx0XHRcdFx0XHRob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XHJcbiBcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcclxuIFx0XHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxyXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcclxuIFx0XHRcdFx0ZWxzZVxyXG4gXHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XHJcbiBcdFx0XHRcdGlmKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcclxuIFx0XHRcdH0sXHJcbiBcdFxyXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcclxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcclxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcclxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xyXG4gXHRcdFx0XHRpZighbCkgcmV0dXJuIGhvdFN0YXR1cztcclxuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XHJcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xyXG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcclxuIFx0XHRcdFx0aWYoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xyXG4gXHRcdFx0fSxcclxuIFx0XHJcbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcclxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxyXG4gXHRcdH07XHJcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xyXG4gXHRcdHJldHVybiBob3Q7XHJcbiBcdH1cclxuIFx0XHJcbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xyXG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XHJcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xyXG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcclxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcclxuIFx0fVxyXG4gXHRcclxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcclxuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XHJcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcclxuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xyXG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcclxuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XHJcbiBcdHZhciBob3REZWZlcnJlZDtcclxuIFx0XHJcbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xyXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xyXG4gXHRcclxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xyXG4gXHRcdHZhciBpc051bWJlciA9ICgraWQpICsgXCJcIiA9PT0gaWQ7XHJcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XHJcbiBcdFx0aWYoaG90U3RhdHVzICE9PSBcImlkbGVcIikgdGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XHJcbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xyXG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xyXG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xyXG4gXHRcdFx0aWYoIXVwZGF0ZSkge1xyXG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xyXG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuIFx0XHRcdH1cclxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XHJcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcclxuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XHJcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XHJcbiBcdFxyXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcclxuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xyXG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXHJcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcclxuIFx0XHRcdFx0fTtcclxuIFx0XHRcdH0pO1xyXG4gXHRcdFx0aG90VXBkYXRlID0ge307XHJcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IDA7XHJcbiBcdFx0XHR7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbG9uZS1ibG9ja3NcclxuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cclxuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XHJcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcclxuIFx0XHRcdH1cclxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xyXG4gXHRcdH0pO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0aWYoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcclxuIFx0XHRcdHJldHVybjtcclxuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xyXG4gXHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcdGlmKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcclxuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcclxuIFx0XHR9XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcclxuIFx0XHRpZighaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcclxuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XHJcbiBcdFx0fSBlbHNlIHtcclxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcclxuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xyXG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcclxuIFx0XHR9XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XHJcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XHJcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XHJcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xyXG4gXHRcdGlmKCFkZWZlcnJlZCkgcmV0dXJuO1xyXG4gXHRcdGlmKGhvdEFwcGx5T25VcGRhdGUpIHtcclxuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXHJcbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cclxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcclxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiBcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcclxuIFx0XHRcdH0pLnRoZW4oXHJcbiBcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gXHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcclxuIFx0XHRcdFx0fSxcclxuIFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XHJcbiBcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdCk7XHJcbiBcdFx0fSBlbHNlIHtcclxuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcclxuIFx0XHRcdGZvcih2YXIgaWQgaW4gaG90VXBkYXRlKSB7XHJcbiBcdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xyXG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xyXG4gXHRcdH1cclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xyXG4gXHRcdGlmKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKSB0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XHJcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiBcdFxyXG4gXHRcdHZhciBjYjtcclxuIFx0XHR2YXIgaTtcclxuIFx0XHR2YXIgajtcclxuIFx0XHR2YXIgbW9kdWxlO1xyXG4gXHRcdHZhciBtb2R1bGVJZDtcclxuIFx0XHJcbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xyXG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XHJcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcclxuIFx0XHJcbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKS5tYXAoZnVuY3Rpb24oaWQpIHtcclxuIFx0XHRcdFx0cmV0dXJuIHtcclxuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcclxuIFx0XHRcdFx0XHRpZDogaWRcclxuIFx0XHRcdFx0fTtcclxuIFx0XHRcdH0pO1xyXG4gXHRcdFx0d2hpbGUocXVldWUubGVuZ3RoID4gMCkge1xyXG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XHJcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcclxuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xyXG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0aWYoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpXHJcbiBcdFx0XHRcdFx0Y29udGludWU7XHJcbiBcdFx0XHRcdGlmKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xyXG4gXHRcdFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcclxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcclxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxyXG4gXHRcdFx0XHRcdH07XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0aWYobW9kdWxlLmhvdC5fbWFpbikge1xyXG4gXHRcdFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcclxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcclxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxyXG4gXHRcdFx0XHRcdH07XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XHJcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xyXG4gXHRcdFx0XHRcdGlmKCFwYXJlbnQpIGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdGlmKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xyXG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcclxuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxyXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxyXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXHJcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxyXG4gXHRcdFx0XHRcdFx0fTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0aWYob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpID49IDApIGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdGlmKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xyXG4gXHRcdFx0XHRcdFx0aWYoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcclxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XHJcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xyXG4gXHRcdFx0XHRcdFx0Y29udGludWU7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XHJcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xyXG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xyXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcclxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxyXG4gXHRcdFx0XHRcdH0pO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFxyXG4gXHRcdFx0cmV0dXJuIHtcclxuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxyXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXHJcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxyXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcclxuIFx0XHRcdH07XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XHJcbiBcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XHJcbiBcdFx0XHRcdGlmKGEuaW5kZXhPZihpdGVtKSA8IDApXHJcbiBcdFx0XHRcdFx0YS5wdXNoKGl0ZW0pO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcclxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXHJcbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XHJcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xyXG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XHJcbiBcdFxyXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XHJcbiBcdFx0XHRjb25zb2xlLndhcm4oXCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCIpO1xyXG4gXHRcdH07XHJcbiBcdFxyXG4gXHRcdGZvcih2YXIgaWQgaW4gaG90VXBkYXRlKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcclxuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcclxuIFx0XHRcdFx0dmFyIHJlc3VsdDtcclxuIFx0XHRcdFx0aWYoaG90VXBkYXRlW2lkXSkge1xyXG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xyXG4gXHRcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcclxuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcclxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxyXG4gXHRcdFx0XHRcdH07XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcclxuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcclxuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xyXG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcclxuIFx0XHRcdFx0aWYocmVzdWx0LmNoYWluKSB7XHJcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdHN3aXRjaChyZXN1bHQudHlwZSkge1xyXG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRGVjbGluZWQpXHJcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xyXG4gXHRcdFx0XHRcdFx0aWYoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXHJcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArIHJlc3VsdC5tb2R1bGVJZCArIGNoYWluSW5mbyk7XHJcbiBcdFx0XHRcdFx0XHRicmVhaztcclxuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcclxuIFx0XHRcdFx0XHRcdGlmKG9wdGlvbnMub25EZWNsaW5lZClcclxuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XHJcbiBcdFx0XHRcdFx0XHRpZighb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcclxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiIGluIFwiICsgcmVzdWx0LnBhcmVudElkICsgY2hhaW5JbmZvKTtcclxuIFx0XHRcdFx0XHRcdGJyZWFrO1xyXG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uVW5hY2NlcHRlZClcclxuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcclxuIFx0XHRcdFx0XHRcdGlmKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXHJcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvKTtcclxuIFx0XHRcdFx0XHRcdGJyZWFrO1xyXG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxyXG4gXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vbkFjY2VwdGVkKVxyXG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcclxuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xyXG4gXHRcdFx0XHRcdFx0YnJlYWs7XHJcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRGlzcG9zZWQpXHJcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xyXG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcclxuIFx0XHRcdFx0XHRcdGJyZWFrO1xyXG4gXHRcdFx0XHRcdGRlZmF1bHQ6XHJcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGlmKGFib3J0RXJyb3IpIHtcclxuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcclxuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0aWYoZG9BcHBseSkge1xyXG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xyXG4gXHRcdFx0XHRcdGZvcihtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcclxuIFx0XHRcdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHRcdFx0XHRpZighb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxyXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xyXG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pO1xyXG4gXHRcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRpZihkb0Rpc3Bvc2UpIHtcclxuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcclxuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxyXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcclxuIFx0XHRmb3IoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xyXG4gXHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiYgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWQpXHJcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcclxuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxyXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcclxuIFx0XHRcdFx0fSk7XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xyXG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcclxuIFx0XHRcdGlmKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xyXG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0fSk7XHJcbiBcdFxyXG4gXHRcdHZhciBpZHg7XHJcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XHJcbiBcdFx0d2hpbGUocXVldWUubGVuZ3RoID4gMCkge1xyXG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcclxuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0aWYoIW1vZHVsZSkgY29udGludWU7XHJcbiBcdFxyXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcclxuIFx0XHJcbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcclxuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XHJcbiBcdFx0XHRmb3IoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcclxuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XHJcbiBcdFx0XHRcdGNiKGRhdGEpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcclxuIFx0XHJcbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxyXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcclxuIFx0XHJcbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcclxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHJcbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXHJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xyXG4gXHRcclxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXHJcbiBcdFx0XHRmb3IoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcclxuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xyXG4gXHRcdFx0XHRpZighY2hpbGQpIGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xyXG4gXHRcdFx0XHRpZihpZHggPj0gMCkge1xyXG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXHJcbiBcdFx0dmFyIGRlcGVuZGVuY3k7XHJcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xyXG4gXHRcdGZvcihtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdGlmKG1vZHVsZSkge1xyXG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHRcdGZvcihqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XHJcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XHJcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcclxuIFx0XHRcdFx0XHRcdGlmKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBOb3QgaW4gXCJhcHBseVwiIHBoYXNlXHJcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XHJcbiBcdFxyXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcclxuIFx0XHJcbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXHJcbiBcdFx0Zm9yKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXHJcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcclxuIFx0XHRmb3IobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHRpZihtb2R1bGUpIHtcclxuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XHJcbiBcdFx0XHRcdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcclxuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XHJcbiBcdFx0XHRcdFx0XHRpZihjYikge1xyXG4gXHRcdFx0XHRcdFx0XHRpZihjYWxsYmFja3MuaW5kZXhPZihjYikgPj0gMCkgY29udGludWU7XHJcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0Zm9yKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcclxuIFx0XHRcdFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcclxuIFx0XHRcdFx0XHRcdH0gY2F0Y2goZXJyKSB7XHJcbiBcdFx0XHRcdFx0XHRcdGlmKG9wdGlvbnMub25FcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xyXG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxyXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxyXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcclxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuIFx0XHRcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdFx0XHRpZighb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRcdFx0aWYoIWVycm9yKVxyXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3IgPSBlcnI7XHJcbiBcdFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXHJcbiBcdFx0Zm9yKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcclxuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XHJcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XHJcbiBcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcclxuIFx0XHRcdH0gY2F0Y2goZXJyKSB7XHJcbiBcdFx0XHRcdGlmKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiBcdFx0XHRcdFx0dHJ5IHtcclxuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XHJcbiBcdFx0XHRcdFx0fSBjYXRjaChlcnIyKSB7XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRXJyb3JlZCkge1xyXG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XHJcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcclxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXHJcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXHJcbiBcdFx0XHRcdFx0XHRcdFx0b3JnaW5hbEVycm9yOiBlcnIsIC8vIFRPRE8gcmVtb3ZlIGluIHdlYnBhY2sgNFxyXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxyXG4gXHRcdFx0XHRcdFx0XHR9KTtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRcdGlmKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcclxuIFx0XHRcdFx0XHRcdFx0aWYoIWVycm9yKVxyXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyMjtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcclxuIFx0XHRcdFx0XHRcdFx0ZXJyb3IgPSBlcnI7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRcdGlmKG9wdGlvbnMub25FcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XHJcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxyXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXHJcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcclxuIFx0XHRcdFx0XHRcdH0pO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRpZighb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRpZighZXJyb3IpXHJcbiBcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcclxuIFx0XHRpZihlcnJvcikge1xyXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcclxuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xyXG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XHJcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XHJcbiBcdFx0fSk7XHJcbiBcdH1cclxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoMCkoX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYzFmMTFiMTE5Y2U3NWIzNGQ4MjkiLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVwZGF0ZWRNb2R1bGVzLCByZW5ld2VkTW9kdWxlcykge1xyXG5cdHZhciB1bmFjY2VwdGVkTW9kdWxlcyA9IHVwZGF0ZWRNb2R1bGVzLmZpbHRlcihmdW5jdGlvbihtb2R1bGVJZCkge1xyXG5cdFx0cmV0dXJuIHJlbmV3ZWRNb2R1bGVzICYmIHJlbmV3ZWRNb2R1bGVzLmluZGV4T2YobW9kdWxlSWQpIDwgMDtcclxuXHR9KTtcclxuXHR2YXIgbG9nID0gcmVxdWlyZShcIi4vbG9nXCIpO1xyXG5cclxuXHRpZih1bmFjY2VwdGVkTW9kdWxlcy5sZW5ndGggPiAwKSB7XHJcblx0XHRsb2coXCJ3YXJuaW5nXCIsIFwiW0hNUl0gVGhlIGZvbGxvd2luZyBtb2R1bGVzIGNvdWxkbid0IGJlIGhvdCB1cGRhdGVkOiAoVGhleSB3b3VsZCBuZWVkIGEgZnVsbCByZWxvYWQhKVwiKTtcclxuXHRcdHVuYWNjZXB0ZWRNb2R1bGVzLmZvckVhY2goZnVuY3Rpb24obW9kdWxlSWQpIHtcclxuXHRcdFx0bG9nKFwid2FybmluZ1wiLCBcIltITVJdICAtIFwiICsgbW9kdWxlSWQpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRpZighcmVuZXdlZE1vZHVsZXMgfHwgcmVuZXdlZE1vZHVsZXMubGVuZ3RoID09PSAwKSB7XHJcblx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gTm90aGluZyBob3QgdXBkYXRlZC5cIik7XHJcblx0fSBlbHNlIHtcclxuXHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSBVcGRhdGVkIG1vZHVsZXM6XCIpO1xyXG5cdFx0cmVuZXdlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbihtb2R1bGVJZCkge1xyXG5cdFx0XHRpZih0eXBlb2YgbW9kdWxlSWQgPT09IFwic3RyaW5nXCIgJiYgbW9kdWxlSWQuaW5kZXhPZihcIiFcIikgIT09IC0xKSB7XHJcblx0XHRcdFx0dmFyIHBhcnRzID0gbW9kdWxlSWQuc3BsaXQoXCIhXCIpO1xyXG5cdFx0XHRcdGxvZy5ncm91cENvbGxhcHNlZChcImluZm9cIiwgXCJbSE1SXSAgLSBcIiArIHBhcnRzLnBvcCgpKTtcclxuXHRcdFx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gIC0gXCIgKyBtb2R1bGVJZCk7XHJcblx0XHRcdFx0bG9nLmdyb3VwRW5kKFwiaW5mb1wiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gIC0gXCIgKyBtb2R1bGVJZCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0dmFyIG51bWJlcklkcyA9IHJlbmV3ZWRNb2R1bGVzLmV2ZXJ5KGZ1bmN0aW9uKG1vZHVsZUlkKSB7XHJcblx0XHRcdHJldHVybiB0eXBlb2YgbW9kdWxlSWQgPT09IFwibnVtYmVyXCI7XHJcblx0XHR9KTtcclxuXHRcdGlmKG51bWJlcklkcylcclxuXHRcdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdIENvbnNpZGVyIHVzaW5nIHRoZSBOYW1lZE1vZHVsZXNQbHVnaW4gZm9yIG1vZHVsZSBuYW1lcy5cIik7XHJcblx0fVxyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvaG90L2xvZy1hcHBseS1yZXN1bHQuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2xvZy1hcHBseS1yZXN1bHQuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGxvZ0xldmVsID0gXCJpbmZvXCI7XHJcblxyXG5mdW5jdGlvbiBkdW1teSgpIHt9XHJcblxyXG5mdW5jdGlvbiBzaG91bGRMb2cobGV2ZWwpIHtcclxuXHR2YXIgc2hvdWxkTG9nID0gKGxvZ0xldmVsID09PSBcImluZm9cIiAmJiBsZXZlbCA9PT0gXCJpbmZvXCIpIHx8XHJcblx0XHQoW1wiaW5mb1wiLCBcIndhcm5pbmdcIl0uaW5kZXhPZihsb2dMZXZlbCkgPj0gMCAmJiBsZXZlbCA9PT0gXCJ3YXJuaW5nXCIpIHx8XHJcblx0XHQoW1wiaW5mb1wiLCBcIndhcm5pbmdcIiwgXCJlcnJvclwiXS5pbmRleE9mKGxvZ0xldmVsKSA+PSAwICYmIGxldmVsID09PSBcImVycm9yXCIpO1xyXG5cdHJldHVybiBzaG91bGRMb2c7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvZ0dyb3VwKGxvZ0ZuKSB7XHJcblx0cmV0dXJuIGZ1bmN0aW9uKGxldmVsLCBtc2cpIHtcclxuXHRcdGlmKHNob3VsZExvZyhsZXZlbCkpIHtcclxuXHRcdFx0bG9nRm4obXNnKTtcclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxldmVsLCBtc2cpIHtcclxuXHRpZihzaG91bGRMb2cobGV2ZWwpKSB7XHJcblx0XHRpZihsZXZlbCA9PT0gXCJpbmZvXCIpIHtcclxuXHRcdFx0Y29uc29sZS5sb2cobXNnKTtcclxuXHRcdH0gZWxzZSBpZihsZXZlbCA9PT0gXCJ3YXJuaW5nXCIpIHtcclxuXHRcdFx0Y29uc29sZS53YXJuKG1zZyk7XHJcblx0XHR9IGVsc2UgaWYobGV2ZWwgPT09IFwiZXJyb3JcIikge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKG1zZyk7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxudmFyIGdyb3VwID0gY29uc29sZS5ncm91cCB8fCBkdW1teTtcclxudmFyIGdyb3VwQ29sbGFwc2VkID0gY29uc29sZS5ncm91cENvbGxhcHNlZCB8fCBkdW1teTtcclxudmFyIGdyb3VwRW5kID0gY29uc29sZS5ncm91cEVuZCB8fCBkdW1teTtcclxuXHJcbm1vZHVsZS5leHBvcnRzLmdyb3VwID0gbG9nR3JvdXAoZ3JvdXApO1xyXG5cclxubW9kdWxlLmV4cG9ydHMuZ3JvdXBDb2xsYXBzZWQgPSBsb2dHcm91cChncm91cENvbGxhcHNlZCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5ncm91cEVuZCA9IGxvZ0dyb3VwKGdyb3VwRW5kKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzLnNldExvZ0xldmVsID0gZnVuY3Rpb24obGV2ZWwpIHtcclxuXHRsb2dMZXZlbCA9IGxldmVsO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvaG90L2xvZy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvbG9nLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8qZ2xvYmFscyBfX3Jlc291cmNlUXVlcnkgKi9cclxuaWYobW9kdWxlLmhvdCkge1xyXG5cdHZhciBob3RQb2xsSW50ZXJ2YWwgPSArKF9fcmVzb3VyY2VRdWVyeS5zdWJzdHIoMSkpIHx8ICgxMCAqIDYwICogMTAwMCk7XHJcblx0dmFyIGxvZyA9IHJlcXVpcmUoXCIuL2xvZ1wiKTtcclxuXHJcblx0dmFyIGNoZWNrRm9yVXBkYXRlID0gZnVuY3Rpb24gY2hlY2tGb3JVcGRhdGUoZnJvbVVwZGF0ZSkge1xyXG5cdFx0aWYobW9kdWxlLmhvdC5zdGF0dXMoKSA9PT0gXCJpZGxlXCIpIHtcclxuXHRcdFx0bW9kdWxlLmhvdC5jaGVjayh0cnVlKS50aGVuKGZ1bmN0aW9uKHVwZGF0ZWRNb2R1bGVzKSB7XHJcblx0XHRcdFx0aWYoIXVwZGF0ZWRNb2R1bGVzKSB7XHJcblx0XHRcdFx0XHRpZihmcm9tVXBkYXRlKSBsb2coXCJpbmZvXCIsIFwiW0hNUl0gVXBkYXRlIGFwcGxpZWQuXCIpO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXF1aXJlKFwiLi9sb2ctYXBwbHktcmVzdWx0XCIpKHVwZGF0ZWRNb2R1bGVzLCB1cGRhdGVkTW9kdWxlcyk7XHJcblx0XHRcdFx0Y2hlY2tGb3JVcGRhdGUodHJ1ZSk7XHJcblx0XHRcdH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG5cdFx0XHRcdHZhciBzdGF0dXMgPSBtb2R1bGUuaG90LnN0YXR1cygpO1xyXG5cdFx0XHRcdGlmKFtcImFib3J0XCIsIFwiZmFpbFwiXS5pbmRleE9mKHN0YXR1cykgPj0gMCkge1xyXG5cdFx0XHRcdFx0bG9nKFwid2FybmluZ1wiLCBcIltITVJdIENhbm5vdCBhcHBseSB1cGRhdGUuXCIpO1xyXG5cdFx0XHRcdFx0bG9nKFwid2FybmluZ1wiLCBcIltITVJdIFwiICsgZXJyLnN0YWNrIHx8IGVyci5tZXNzYWdlKTtcclxuXHRcdFx0XHRcdGxvZyhcIndhcm5pbmdcIiwgXCJbSE1SXSBZb3UgbmVlZCB0byByZXN0YXJ0IHRoZSBhcHBsaWNhdGlvbiFcIik7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGxvZyhcIndhcm5pbmdcIiwgXCJbSE1SXSBVcGRhdGUgZmFpbGVkOiBcIiArIGVyci5zdGFjayB8fCBlcnIubWVzc2FnZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9O1xyXG5cdHNldEludGVydmFsKGNoZWNrRm9yVXBkYXRlLCBob3RQb2xsSW50ZXJ2YWwpO1xyXG59IGVsc2Uge1xyXG5cdHRocm93IG5ldyBFcnJvcihcIltITVJdIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnQgaXMgZGlzYWJsZWQuXCIpO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9ob3QvcG9sbC5qcz8xMDAwXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2hvdC9wb2xsLmpzPzEwMDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IERvY05vZGUgZnJvbSAnLi4vLi4vbW9kZWwvRG9jTm9kZSdcblxuY29uc3QgZG9jTm9kZXMgPSBbXG4gIG5ldyBEb2NOb2RlKCcxJywgJzEyNy4wLjAuMScsIDU1NTUpLFxuICBuZXcgRG9jTm9kZSgnMicsICcxOTIuMTY4LjAuMTMnLCA1NTU1KVxuXVxuXG5mdW5jdGlvbiBnZXRBbGxOb2RlcyAoKSB7XG4gIHJldHVybiBkb2NOb2Rlc1xufVxuXG5leHBvcnQgeyBnZXRBbGxOb2RlcyB9XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUGx1Z2lucy9Eb2NOb2Rlc0ZpbmRlci9zdGF0aWNDb2RlLmpzIiwiLyoqXG4gKiBTdGFydGluZyBwb2ludCBvZiBvdXIgcHJvamVjdFxuICpcbiAqL1xuY29uc3QgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCdodHRwLWVycm9ycycpXG5jb25zdCBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpXG5jb25zdCBjb29raWVQYXJzZXIgPSByZXF1aXJlKCdjb29raWUtcGFyc2VyJylcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ21vcmdhbicpXG5jb25zdCBhcHAgPSBleHByZXNzKClcblxuYXBwLnVzZShsb2dnZXIoJ2RldicpKVxuYXBwLnVzZShleHByZXNzLmpzb24oKSlcbmFwcC51c2UoZXhwcmVzcy51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IGZhbHNlIH0pKVxuYXBwLnVzZShjb29raWVQYXJzZXIoKSlcblxuLyoqXG4gKiBSb3V0ZXMgc2VjdGlvbiwgbG9hZCByb3V0ZXM6XG4gKiAgLSBjb250YWluZXJzXG4gKiAgLSB2b2x1bWVzXG4gKi9cbmNvbnN0IGRvY05vZGVzUm91dGVyID0gcmVxdWlyZSgncm91dGVzL2FwaS9kb2NOb2RlcycpXG5cbmFwcC51c2UoJy9hcGkvdicgKyBwcm9jZXNzLmVudi5ucG1fcGFja2FnZV92ZXJzaW9uICsgJy9ub2RlcycsIGRvY05vZGVzUm91dGVyKVxuXG4vLyBjYXRjaCA0MDQgYW5kIGZvcndhcmQgdG8gZXJyb3IgaGFuZGxlclxuYXBwLnVzZShmdW5jdGlvbiAocmVxLCByZXMsIG5leHQpIHtcbiAgbmV4dChjcmVhdGVFcnJvcig0MDQpKVxufSlcblxuLy8gZXJyb3IgaGFuZGxlclxuYXBwLnVzZShmdW5jdGlvbiAoZXJyLCByZXEsIHJlcykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICBjb25zb2xlLmxvZyhlcnIpXG4gIH1cbiAgcmVzLnNldEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKVxuICByZXMuc3RhdHVzKGVyci5zdGF0dXMgfHwgNTAwKVxuICByZXMuanNvbih7XG4gICAgY29kZTogZXJyLnN0YXR1cyB8fCA1MDAsXG4gICAgbWVzc2FnZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdkZXZlbG9wbWVudCcgPyAnSW50ZXJuYWwgc2VydmVyIGVycm9yJyA6IGVyci5tZXNzYWdlXG4gIH0pXG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFwcFxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC5qcyIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG5jb25zdCBhcHAgPSByZXF1aXJlKCdhcHAnKVxuY29uc3QgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdoZWxsb3dvcmxkOnNlcnZlcicpXG5jb25zdCBodHRwID0gcmVxdWlyZSgnaHR0cCcpXG5cbi8qKlxuICogR2V0IHBvcnQgZnJvbSBlbnZpcm9ubWVudCBhbmQgc3RvcmUgaW4gRXhwcmVzcy5cbiAqL1xuXG5jb25zdCBwb3J0ID0gbm9ybWFsaXplUG9ydChwcm9jZXNzLmVudi5QT1JUIHx8ICczMDAwJylcbmFwcC5zZXQoJ3BvcnQnLCBwb3J0KVxuXG4vKipcbiAqIENyZWF0ZSBIVFRQIHNlcnZlci5cbiAqL1xuXG5jb25zdCBzZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcihhcHApXG5cbi8qKlxuICogTGlzdGVuIG9uIHByb3ZpZGVkIHBvcnQsIG9uIGFsbCBuZXR3b3JrIGludGVyZmFjZXMuXG4gKi9cblxuc2VydmVyLmxpc3Rlbihwb3J0KVxuc2VydmVyLm9uKCdlcnJvcicsIG9uRXJyb3IpXG5zZXJ2ZXIub24oJ2xpc3RlbmluZycsIG9uTGlzdGVuaW5nKVxuXG4vKipcbiAqIE5vcm1hbGl6ZSBhIHBvcnQgaW50byBhIG51bWJlciwgc3RyaW5nLCBvciBmYWxzZS5cbiAqL1xuXG5mdW5jdGlvbiBub3JtYWxpemVQb3J0ICh2YWwpIHtcbiAgY29uc3QgcG9ydCA9IHBhcnNlSW50KHZhbCwgMTApXG5cbiAgaWYgKGlzTmFOKHBvcnQpKSB7XG4gICAgLy8gbmFtZWQgcGlwZVxuICAgIHJldHVybiB2YWxcbiAgfVxuXG4gIGlmIChwb3J0ID49IDApIHtcbiAgICAvLyBwb3J0IG51bWJlclxuICAgIHJldHVybiBwb3J0XG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4gKiBFdmVudCBsaXN0ZW5lciBmb3IgSFRUUCBzZXJ2ZXIgXCJlcnJvclwiIGV2ZW50LlxuICovXG5cbmZ1bmN0aW9uIG9uRXJyb3IgKGVycm9yKSB7XG4gIGlmIChlcnJvci5zeXNjYWxsICE9PSAnbGlzdGVuJykge1xuICAgIHRocm93IGVycm9yXG4gIH1cblxuICBjb25zdCBiaW5kID0gdHlwZW9mIHBvcnQgPT09ICdzdHJpbmcnXG4gICAgPyAnUGlwZSAnICsgcG9ydFxuICAgIDogJ1BvcnQgJyArIHBvcnRcblxuICAvLyBoYW5kbGUgc3BlY2lmaWMgbGlzdGVuIGVycm9ycyB3aXRoIGZyaWVuZGx5IG1lc3NhZ2VzXG4gIHN3aXRjaCAoZXJyb3IuY29kZSkge1xuICAgIGNhc2UgJ0VBQ0NFUyc6XG4gICAgICBjb25zb2xlLmVycm9yKGJpbmQgKyAnIHJlcXVpcmVzIGVsZXZhdGVkIHByaXZpbGVnZXMnKVxuICAgICAgcHJvY2Vzcy5leGl0KDEpXG5cbiAgICBjYXNlICdFQUREUklOVVNFJzpcbiAgICAgIGNvbnNvbGUuZXJyb3IoYmluZCArICcgaXMgYWxyZWFkeSBpbiB1c2UnKVxuICAgICAgcHJvY2Vzcy5leGl0KDEpXG5cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgZXJyb3JcbiAgfVxufVxuXG4vKipcbiAqIEV2ZW50IGxpc3RlbmVyIGZvciBIVFRQIHNlcnZlciBcImxpc3RlbmluZ1wiIGV2ZW50LlxuICovXG5cbmZ1bmN0aW9uIG9uTGlzdGVuaW5nICgpIHtcbiAgY29uc3QgYWRkciA9IHNlcnZlci5hZGRyZXNzKClcbiAgY29uc3QgYmluZCA9IHR5cGVvZiBhZGRyID09PSAnc3RyaW5nJ1xuICAgID8gJ3BpcGUgJyArIGFkZHJcbiAgICA6ICdwb3J0ICcgKyBhZGRyLnBvcnRcbiAgZGVidWcoJ0xpc3RlbmluZyBvbiAnICsgYmluZClcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9iaW4vaW5kZXguanMiLCIvKiogQmFzZSBjb250cm9sbGVycyBtb2R1bGUsIGNvbnRhaW5pbmcgbWV0aG9kcyB1c2VmdWxsIGZvciBhbGwgY29udHJvbGxlcnNcbiAqIEBtb2R1bGUgQ29udHJvbGxlcnMvYmFzZUNvbnRyb2xsZXJcbiAqL1xuXG4vKipcbiAqIFJldHVybiBhIGdlbmVyaWMgc3VjY2VzcyByZXNwb25zZVxuICogQHBhcmFtIHtPYmplY3R9IHJlcyAtIHRoZSByZXNwb25zZSBvYmplY3QgdG8gdXNlIHRvIHNlbmQgdGhlIGVycm9yXG4gKiBAcGFyYW0ge09iamVjdH0gcmVzcG9uc2UgLSBhIGdlbmVyaWMganNvbiBvYmplY3QgdG8gcmV0dXJuIGFzIHJlc3BvbnNlIGJvZHlcbiAqL1xuY29uc3Qgc3VjY2Vzc1Jlc3BvbnNlID0gKHJlcywgcmVzcG9uc2UpID0+IHtcbiAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVzcG9uc2UpXG59XG5cbi8qKlxuICogUmV0dXJuIGEgZ2VuZXJpYyBlcnJvciByZXNwb25zZVxuICogQHBhcmFtIHtPYmplY3R9IHJlcyAtIHRoZSByZXNwb25zZSBvYmplY3QgdG8gdXNlIHRvIHNlbmQgdGhlIGVycm9yXG4gKiBAcGFyYW0ge3N0cmluZ30gY29kZSAtIHRoZSBjb2RlIG9mIHRoZSBlcnJvclxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSB0aGUgbWVzc2FnZSBvZiB0aGUgZXJyb3JcbiAqIG1vZHVsZTpDb250cm9sbGVycy9iYXNlQ29udHJvbGxlcn5lcnJvclJlc3BvbnNlXG4gKi9cbmNvbnN0IGVycm9yUmVzcG9uc2UgPSAocmVzLCBjb2RlLCBtZXNzYWdlKSA9PiB7XG4gIHJlcy5zdGF0dXMoY29kZSkuanNvbih7XG4gICAgY29kZSxcbiAgICBtZXNzYWdlXG4gIH0pXG59XG5cbmV4cG9ydCB7XG4gIHN1Y2Nlc3NSZXNwb25zZSxcbiAgZXJyb3JSZXNwb25zZVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRyb2xsZXJzL2Jhc2VDb250cm9sbGVyLmpzIiwiaW1wb3J0ICogYXMgc3RhdGljQ29kZSBmcm9tICdQbHVnaW5zL0RvY05vZGVzRmluZGVyL3N0YXRpY0NvZGUnXG5pbXBvcnQgKiBhcyBiYXNlQ29udHJvbGxlciBmcm9tICdjb250cm9sbGVycy9iYXNlQ29udHJvbGxlcidcblxuY29uc3QgZ2V0Q29uZmlndXJlZFBsdWdpbnMgPSAoKSA9PiB7XG4gIHJldHVybiBbc3RhdGljQ29kZV1cbn1cblxuY29uc3QgZ2V0QWxsTm9kZUxpc3QgPSAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgY29uc3Qgbm9kZXMgPSBbXVxuICBnZXRDb25maWd1cmVkUGx1Z2lucygpLm1hcChwbHVnaW4gPT4gcGx1Z2luLmdldEFsbE5vZGVzKCkubWFwKG5vZGUgPT4gbm9kZXMucHVzaChub2RlKSkpXG4gIGJhc2VDb250cm9sbGVyLnN1Y2Nlc3NSZXNwb25zZShyZXMsIHsgbm9kZXMgfSlcbn1cblxuZXhwb3J0IHtcbiAgZ2V0QWxsTm9kZUxpc3Rcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250cm9sbGVycy9kb2NOb2Rlc0NvbnRyb2xsZXIuanMiLCJjbGFzcyBEb2NOb2RlIHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIERvYyBOb2RlIHJlZmVyZW5jZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSB1bmlxdWUgaWRlbnRpZmllciBmb3IgdGhlIG5vZGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlwIC0gaXAgb2YgdGhlIG5vZGVcbiAgICogQHBhcmFtIHtpbnR9IHBvcnQgLSBwb3J0IG9mIHRoZSBub2RlXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoaWQsIGlwLCBwb3J0KSB7XG4gICAgdGhpcy5pZCA9IGlkXG4gICAgdGhpcy5pcCA9IGlwXG4gICAgdGhpcy5wb3J0ID0gcG9ydFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERvY05vZGVcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tb2RlbC9Eb2NOb2RlLmpzIiwiY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKVxuY29uc3QgZG9jTm9kZXNDb250cm9sbGVyID0gcmVxdWlyZSgnY29udHJvbGxlcnMvZG9jTm9kZXNDb250cm9sbGVyJylcbmNvbnN0IHJvdXRlciA9IG5ldyBleHByZXNzLlJvdXRlcigpXG5cbi8qKlxuICogQHJvdXRlICAgR0VUIGFwaS88dmVyc2lvbj4vbm9kZXMvbGlzdFxuICogQGRlc2MgICAgUmV0dXJuIGEgbGlzdCBvZiBhY3RpdmUgbm9kZXNcbiAqIEBhY2Nlc3MgIFByaXZhdGVcbiAqL1xucm91dGVyLmdldCgnL2xpc3QnLCBkb2NOb2Rlc0NvbnRyb2xsZXIuZ2V0QWxsTm9kZUxpc3QpXG5cbm1vZHVsZS5leHBvcnRzID0gcm91dGVyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcm91dGVzL2FwaS9kb2NOb2Rlcy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvb2tpZS1wYXJzZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjb29raWUtcGFyc2VyXCJcbi8vIG1vZHVsZSBpZCA9IGNvb2tpZS1wYXJzZXJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZGVidWdcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJkZWJ1Z1wiXG4vLyBtb2R1bGUgaWQgPSBkZWJ1Z1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZXhwcmVzc1wiXG4vLyBtb2R1bGUgaWQgPSBleHByZXNzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJodHRwXCJcbi8vIG1vZHVsZSBpZCA9IGh0dHBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cC1lcnJvcnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJodHRwLWVycm9yc1wiXG4vLyBtb2R1bGUgaWQgPSBodHRwLWVycm9yc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb3JnYW5cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJtb3JnYW5cIlxuLy8gbW9kdWxlIGlkID0gbW9yZ2FuXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=